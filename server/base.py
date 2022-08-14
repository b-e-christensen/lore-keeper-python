from flask import Flask


app = Flask(__name__)

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Buster",
        "about": "bustin makes me feel good"
    }
    print(response_body)
    return response_body


@app.route('/')
def test():
    print('test')
    return