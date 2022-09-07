
from os import access, getenv
from flask import Flask, request, Blueprint
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File
from server.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/file', methods=['POST']) # auth wrap
@jwt_required()
def test():
  db = get_db()
  print('route hit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  token_results = get_jwt()
  email = token_results['sub']

  user = db.query(User).filter(User.email == email).one()
  fileName = request.json.get("fileName")
  print(fileName)

  newFile = File(
    title = fileName,
    user_id = user.id
  )
  print(newFile)

  db.add(newFile)
  db.commit()

  return { "message": "File successfully added!"}