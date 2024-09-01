# gpt4_processing_agent.py
import importlib
import os

class GPT4ProcessingAgent:
    def __init__(self, api_key_manager):
        self.api_key_manager = api_key_manager
        self.plugins = self.load_plugins()

    def load_plugins(self):
        plugins = {}
        plugins_dir = 'plugins'  # Diretório onde os plugins são armazenados
        for filename in os.listdir(plugins_dir):
            if filename.endswith('.py') and filename != '__init__.py':
                module_name = filename[:-3]
                module = importlib.import_module(f'plugins.{module_name}')
                plugin_class = getattr(module, f'{module_name.capitalize()}Plugin')
                plugins[module_name] = plugin_class(self.api_key_manager)
        return plugins

    def process_data(self, data):
        processed_data = {}

        for plugin_name, plugin in self.plugins.items():
            processed_data[plugin_name] = plugin.execute(data)

        return processed_data
