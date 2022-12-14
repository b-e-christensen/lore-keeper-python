
from flask import Flask, request, Blueprint, redirect
from server.db import init_db
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File, Content
from server.db import get_db
from server.helpers import check_for_existing_number, file_belongs_to_user

bp = Blueprint('content', __name__, url_prefix='/content')

@bp.route('/', methods=['POST', 'DELETE'])
@jwt_required()
def make_content():
  db = get_db()
  token_results = get_jwt()
  email = token_results['sub']
  user = db.query(User).filter(User.email == email).one()
  file_id = request.json.get('fileId')
  content_name = request.json.get('contentName')
  content_number = request.json.get('contentNumber')
  auth_check = file_belongs_to_user(email, file_id)

  if not auth_check:
    return redirect('/')

  if request.method == 'POST':

    if not content_name:
        return jsonify("must provide a title", 403)
    elif not content_number:
        return jsonify("must provide number", 403)
    # elif not int(content_number) and not float(content_number):
    #     return jsonify("must provide number", 403)
    
    existing_content = db.query(Content).filter(Content.file_id == file_id).all()

    number_check = check_for_existing_number(existing_content, content_number)
    
    if not number_check:
      return { "message": "Parent number does not exist yet!." }

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

  elif request.method == 'DELETE':
    id = request.json.get('content_id')
    try:
      db.delete(db.query(Content).filter(Content.id == id).one())
      db.commit()
    except: 
      print(sys.exc_info()[0])

      db.rollback()
      return jsonify(message = 'Content not found'), 404

    return { "message": "Delete Successful!"}


@bp.route('/update', methods=['POST'])
@jwt_required()
def update():
  content_id = request.json.get('content_id')
  text = request.json.get('text')
  db = get_db()

  content = db.query(Content).filter(Content.id == content_id).one()

  content.content = text

  db.commit()

  return { "Text Saved": text }

@bp.route('/update', methods=['POST'])
@jwt_required()
def update_content():
  data = request.get_json()
  db = get_db()

  existing_content = db.query(Content).filter(Content.file_id == data['file_id']).all()
  content = db.query(Content).filter(Content.id == data['content_id']).one()

  if content.number != data['number']:
    number_check = check_for_existing_number(existing_content, data['number'])
    if not number_check:
      return { "message": "Parent number does not exist yet!."}


  content.title = data['title']
  content.number = data['number']
  content.image = data['image']
  
  db.commit()

  return jsonify(message = 'you did it!')