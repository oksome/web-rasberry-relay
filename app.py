import os
from bottle import Bottle

app = Bottle()

# Ici, j'utilise un dictionnaire global pour stocker
# l'état de mon relai, car je ne connais pas la commande
# pour le lire sur le Pi:
devices = {
    'relay': 'on',
}
    
def relay_is_on():
    return devices['relay']
    

@app.route('/')
def index():
    return open('template.html').read()


@app.route('/static/script.js')
def index():
    # rb pour lire en mode 'binaire' (nécessaire pour les images etc)
    return open('script.js', 'rb').read()

@app.route('/api/relay/on')
def relay_on():
    #os.system("gpio write 0 0")
    devices['relay'] = 'on'
    return "OK"

@app.route('/api/relay/off')
def relay_off():
    #os.system("gpio write 0 1")
    devices['relay'] = 'off'
    return "OK"

@app.route('/api/relay/status')
def relay_status():
    return devices['relay']

app.run(host='', port=8088, reloader=True)
