from os import access, getenv
from flask import Flask, request, Blueprint
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from server.models import User
from server.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/test') # auth wrap
def test():
  db = get_db()
  print('route hit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  print

  find_user = db.query(User).filter(User.email == access_token).one()
  print(find_user)
  return { "message" : "success!"}