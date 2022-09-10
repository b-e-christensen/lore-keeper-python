
from os import access, getenv
from flask import Flask, request, Blueprint
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File, Content
from server.db import get_db

bp = Blueprint('file', __name__, url_prefix='/file')


@bp.route('/single', methods=['POST'])
@jwt_required()
def get_file():
    db = get_db()
    token_results = get_jwt()
    email = token_results['sub']
    fileId = request.json.get('fileId')
    # user = db.query(User).filter(User.email == email).one()
    file = db.query(File).filter(File.id == fileId).one()

    contents = db.query(Content).filter(Content.file_id == file.id).order_by(Content.number).all()

    file_dict = {
        "id": file.id,
        "title": file.title,
        "collaborators": file.collaborators,
    }
    contents_dict = {}
    counter = 0
    for row in contents:
      contents_dict[counter] = {
          "id": row.id,
          "title": row.title,
          "number": row.number,
          "content": row.content,
          "user_id": row.user_id,
          "file_id": row.file_id,
          "image": row.image
      }
      counter += 1

    return {"file": file_dict, "contents": contents_dict}


@bp.route('/content', methods=['POST'])
@jwt_required()
def make_content():
    print('--------------- route hit ----------------')
    db = get_db()
    token_results = get_jwt()
    email = token_results['sub']
    user = db.query(User).filter(User.email == email).one()
    file_id = request.json.get('fileId')
    content_name = request.json.get('contentName')
    content_number = request.json.get('contentNumber')

    if not content_name:
        return jsonify("must provide a title", 403)
    elif not content_number:
        return jsonify("must provide number", 403)
    # elif not int(content_number) and not float(content_number):
    #     return jsonify("must provide number", 403)

    print(int(content_number))
    #  not isinstance(content_number, int)

    new_content = Content(
        title=content_name,
        number=content_number,
        file_id=file_id,
        user_id=user.id
    )

    db.add(new_content)
    db.commit()

    return {"message": "Content successfully added!",
            "New Content": {
                'title': content_name,
                'number': content_number,
                'file_id': file_id,
                'user_id': user.id
            }}
