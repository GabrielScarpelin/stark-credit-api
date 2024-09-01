/*
{
  "news-plugin.py": {
    "version": "0.1",
    "name": "Plugin de noticias",
    "description": "Plugin de noticias para análise de crédito de clientes"
  }
}
*/
type Plugin = {
  version: string;
  name: string;
  description: string;
};
type PluginsMap = {
  [key: string]: Plugin;
};
export default PluginsMap;
