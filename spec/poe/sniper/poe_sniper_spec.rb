require 'spec_helper'

RSpec.describe Poe::Sniper::PoeSniper do
  let(:logger) { double("logger", info: nil, warn: nil, error: nil, debug: nil) }
  let(:described_instance) { described_class.new('config_path') }

  before do
    # We're essentially testing the application here so some initial setup is needed
    ENV['ANALYTICS_KEY'] = Base64.encode64('key')
    allow(Poe::Sniper::Analytics.instance).to receive(:identify)
    allow(Poe::Sniper::Analytics.instance).to receive(:track)
    allow(described_class).to receive(:ensure_config_file!)
    allow(ParseConfig).to receive(:new).and_return({ 'notification_seconds' => 1, 'iteration_wait_time_seconds' => 1, 'input_file_path' => 'input_file.json', 'api_url' => 'api' })
    allow(Poe::Sniper::Encapsulators).to receive(:user_interaction_before).and_yield
    allow(Poe::Sniper::Logger).to receive(:instance).and_return(logger)
  end

  describe 'offline mode' do
    context 'main thread' do
      before do
        allow(Thread).to receive(:new) { double("thread", join: nil) }
      end

      it 'creates alerts' do
        expect(logger).not_to receive(:error)

        described_instance.offline_debug("#{RSPEC_ROOT}/resources/example_socket_data.json")

        expect(described_instance.instance_variable_get(:@alerts).alerts.size).to eq(25)
      end
    end

    it 'starts alert loop' do
      expect(logger).not_to receive(:error)
      expect(described_instance.instance_variable_get(:@alerts)).to receive(:alert_loop)

      described_instance.offline_debug("#{RSPEC_ROOT}/resources/example_socket_data.json")
    end
  end

  describe 'live mode' do
    describe 'input handling' do
      context 'invalid JSON' do
        before do
          allow(File).to receive(:open).and_return(double('file', read: "not a valid JSON"))
        end

        it "raises meaningful error" do
          expect(logger).to receive(:error).with(/File (.+) content format is incorrect or file cannot be accessed. Make sure that it is a valid JSON and accessible. You can use online validators such as jsonformatter.curiousconcept.com. Common mistakes: the last entry should not have a comma at the end, wrong file name in config.ini./)
          described_class.new('config_path').run
        end

        it "doesn't start EventMachine" do
          expect(EM).to_not receive(:run)
          described_class.new('config_path').run
        end

        it "sends error analytics" do
          expect(Poe::Sniper::Analytics.instance).to receive(:track).with(hash_including({ event: 'Exception occured' }))
          described_class.new('config_path').run
        end
      end

      context "valid JSON" do
        context "poe.trade search URL" do
          before do
            allow(File).to receive(:open).and_return(double('file', read: File.open("#{RSPEC_ROOT}/resources/example_input_poe_trade_search.json").read))
          end

          it "calls socket setup for each input entry" do
            expect(described_instance.instance_variable_get(:@sockets)).to receive(:socket_setup).twice
            described_instance.run
          end
        end

        context "poe.trade live search URL" do
          before do
            allow(File).to receive(:open).and_return(double('file', read: File.open("#{RSPEC_ROOT}/resources/example_input_poe_trade_live_search.json").read))
          end

          it "calls socket setup" do
            expect(described_instance.instance_variable_get(:@sockets)).to receive(:socket_setup).twice
            described_instance.run
          end
        end
      end
    end
  end
end
