from DashboardAgent import run_dre_dashboard  
from AgroAgent import run
import pandas as pd

class APIKeyManager:
    def __init__(self, api_key=None):
        self.api_key = api_key

    def set_api_key(self, api_key):
        self.api_key = api_key

    def get_api_key(self):
        if self.api_key:
            return self.api_key
        else:
            raise ValueError("API key not set. Please set the API key before proceeding.")

class DataInputAgent:
    def __init__(self):
        self.data = {}

    def collect_data(self, data):
        self.data = data

    def preprocess_data(self):
        # Simulate preprocessing
        processed_data = {k: v * 1.1 for k, v in self.data.items()}  # Example of processing
        return processed_data


class EcommerceLogisticsPlugin:
    def __init__(self, api_key_manager):
        self.api_key_manager = api_key_manager

    def execute(self, data):
        api_key = self.api_key_manager.get_api_key()
        # Simulate some operations
        return {"ecommerce_report": "Ecommerce logistics processed"}


class FoodLogisticsPlugin:
    def __init__(self, api_key_manager):
        self.api_key_manager = api_key_manager

    def execute(self, data):
        api_key = self.api_key_manager.get_api_key()
        # Simulate some operations
        return {"food_report": "Food logistics processed"}


class AgroPlugin:
    def __init__(self, api_key_manager):
        self.api_key_manager = api_key_manager

    def execute(self, data):
        api_key = self.api_key_manager.get_api_key()
        # Simulate some operations
        print(api_key)
        print(f"data: {data}")

        predictions = run()
        print(predictions)
        return "predictions"


class GPT4ProcessingAgent:
    def __init__(self, api_key_manager):
        self.plugins = {
            "ecommerce": EcommerceLogisticsPlugin(api_key_manager),
            "food": FoodLogisticsPlugin(api_key_manager),
            "agro": AgroPlugin(api_key_manager)
        }

    def process_data(self, data):
        processed_data = {}

        # Determine which plugin to activate
        if "order_volume" in data:
            processed_data["ecommerce"] = self.plugins["ecommerce"].execute(data)
        if "food_inventory" in data:
            processed_data["food"] = self.plugins["food"].execute(data)
        if "crop_yield" in data:
            processed_data["agro"] = self.plugins["agro"].execute(data)

        return processed_data

# Dashboard agent - ok
class DashboardAgent:
    def display(self, processed_data):
        # Defina a URL do PDF e o número da página
        url = "https://api.mziq.com/mzfilemanager/v2/d/2c1e0dd9-31eb-4dc0-ab4d-844683600488/4c9fcbfa-813f-0811-6d11-5f2224503769?origin=1"
        page_number = 14  # Por exemplo, página 14

        parsed_json = run_dre_dashboard(url, page_number)

        return parsed_json


def main():
    # Initialize API key manager
    api_key_manager = APIKeyManager()

    # Set the Gemini API key
    gemini_api_key = "yAIzaSyCMEm2Y647SsXAniR719Ozj1BP27_LPFGY"  # Replace this with your actual API key
    api_key_manager.set_api_key(gemini_api_key)

    # Initialize agents
    data_agent = DataInputAgent()
    gpt4_agent = GPT4ProcessingAgent(api_key_manager)
    dashboard_agent = DashboardAgent()

    # Simulate incoming data
    incoming_data = {
        "order_volume": 150,
        "food_inventory": 2000,
        "crop_yield": 5000
    }

    # Collect and preprocess data
    data_agent.collect_data(incoming_data)
    preprocessed_data = data_agent.preprocess_data()

    # Process data with GPT-4 and plugins
    processed_data = gpt4_agent.process_data(preprocessed_data)

    # Display the processed data on the dashboard
    dashboard_data = dashboard_agent.display(processed_data)
    return dashboard_data

if __name__ == "__main__":
    main()
