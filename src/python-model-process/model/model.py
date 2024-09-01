import sys
import json
from agentAi import APIKeyManager, DataInputAgent, GPT4ProcessingAgent, DashboardAgent  # Importe as classes necessárias

# Função para simular a previsão e integrar com os agentes
def predict(data):
    # Inicializa o API Key Manager
    api_key_manager = APIKeyManager()
    
    # Defina a chave API
    gemini_api_key = "yAIzaSyCMEm2Y647SsXAniR719Ozj1BP27_LPFGY"  # Substitua pela sua chave de API real
    api_key_manager.set_api_key(gemini_api_key)
    
    # Inicializa os agentes
    data_agent = DataInputAgent()
    gpt4_agent = GPT4ProcessingAgent(api_key_manager)
    dashboard_agent = DashboardAgent()
    
    # Coleta e preprocessa os dados
    print(data)
    data_agent.collect_data(data)
    preprocessed_data = data_agent.preprocess_data()
    
    # Processa os dados com GPT-4 e plugins
    processed_data = gpt4_agent.process_data(preprocessed_data)
    
    # Exibe os dados processados (ou retorna se for o caso)
    dashboard_agent.display(processed_data)
    
    return processed_data  # Retorne os dados processados para uso posterior

if __name__ == "__main__":
    # Recebe dados do stdin
    input_data = sys.stdin.read()

    if not input_data.strip():
        sys.exit(1)

    try:
        data = json.loads(input_data)
    except json.JSONDecodeError as e:
        sys.exit(1)

    # Executa a previsão/inferência usando os agentes
    result = predict(data)

    # Retorna o resultado para o stdout como JSON
    print(result)

    sys.stdout.write(str(result))
