import requests


def run():
    # requisição http para o meu microserviço

    # URL do microserviço
    url = 'http://localhost:5000/predict'

    # Realizando a requisição GET
    response = requests.post(url)

    # Verificando o status da resposta
    if response.status_code == 200:
        # Processando a resposta
        data = response.json()
        print("Dados recebidos:", data)
    else:
        print("Erro:", response.status_code)


if __name__ == '__main__':
    run()
