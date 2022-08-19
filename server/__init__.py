from os import getenv
from flask import Flask, request
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from server.models import User
from server.db import get_db


def create_app(test_config=None):
  # set up app config
  app = Flask(__name__, static_url_path='/')
  app.url_map.strict_slashes = False
  app.config['DEBUG'] = True
  app.config["JWT_SECRET_KEY"] = getenv('JWT_SECRET')
  app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=6)
  app.config.from_mapping(
    SECRET_KEY=getenv('SECRET')
  )

  jwt = JWTManager(app)

  @app.route('/login', methods=["POST"])
  def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    db = get_db()
    try:
      user = db.query(User).filter(User.email == email).one()
    except:
      print(sys.exc_info()[0])

      return jsonify(message = 'Incorrect credentials'), 400
    
    if user.verify_password(password) == False:
      return jsonify(message = 'Incorrect credentials'), 400

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response

  @app.route('/profile')
  @jwt_required() # auth wrap
  def my_profile():
    response_body = {
        "name": "Ghost Buster",
        "about": "bustin makes me feel good"
    }
    print(response_body)
    return response_body

  @app.route("/logout", methods=["POST"])
  def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

  @app.after_request
  def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=6))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


  init_db(app)


  return app