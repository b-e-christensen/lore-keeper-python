# from flask import Flask


# app = Flask(__name__)

# @app.route('/profile')
# def my_profile():
#     response_body = {
#         "name": "Buster",
#         "about": "bustin makes me feel good"
#     }
#     print(response_body)
#     return response_body


# @app.route('/')
# def test():
#     print('test')
#     return

from flask import Flask

from server.db import init_db


def create_app(test_config=None):
  # set up app config
  app = Flask(__name__, static_url_path='/')
  app.url_map.strict_slashes = False
  app.config['DEBUG'] = True
  app.config.from_mapping(
    SECRET_KEY='super_secret_key'
  )

  @app.route('/profile')
  def my_profile():
    response_body = {
        "name": "Buster",
        "about": "bustin makes me feel good"
    }
    print(response_body)
    return response_body

#   app.register_blueprint(dashboard)
#   app.register_blueprint(home)
#   app.register_blueprint(api)
  init_db(app)


  return app