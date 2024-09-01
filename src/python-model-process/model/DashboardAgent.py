import requests
import PyPDF2
import io
import re
import pandas as pd
import json

class DREDashboard:
    def __init__(self, url):
        self.url = url
        self.df = None

    def download_pdf(self):
        response = requests.get(self.url)
        return response.content

    def extract_text_from_page(self, pdf_content, page_number):
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
        page = pdf_reader.pages[page_number - 1]  # Page number is 1-based
        text = page.extract_text()
        return text

    def parse_dre(self, text):
        pattern = r"([A-Za-z\s]+)\s+([\d\.,]+)"
        matches = re.findall(pattern, text)

        items = []
        values = []

        for match in matches:
            item = match[0].strip()
            value = match[1].replace('.', '').replace(',', '.').strip()
            try:
                value = float(value)
                items.append(item)
                values.append(value)
            except ValueError:
                continue

        self.df = pd.DataFrame({"Item": items, "Value": values})
        # Filter out rows where 'Item' is not meaningful
        self.df = self.df[self.df['Item'].apply(lambda x: len(x.split()) > 2)]
        return self.df

    def get_parsed_data(self):
        if self.df is not None:
            return self.df.to_dict(orient="records")
        else:
            return {"error": "No data parsed"}

def run_dre_dashboard(url, page_number=14):
    dashboard = DREDashboard(url)
    pdf_content = dashboard.download_pdf()
    page_text = dashboard.extract_text_from_page(pdf_content, page_number)
    dashboard.parse_dre(page_text)
    parsed_data = dashboard.get_parsed_data()
    return json.dumps(parsed_data, indent=4)

class DashboardAgent:
    def display(self, processed_data):
        url = "https://api.mziq.com/mzfilemanager/v2/d/2c1e0dd9-31eb-4dc0-ab4d-844683600488/4c9fcbfa-813f-0811-6d11-5f2224503769?origin=1"
        page_number = 14

        parsed_json = run_dre_dashboard(url, page_number)

        return parsed_json
