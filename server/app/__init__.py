# __init__.py 
from urllib import response
from flask import Flask 
from app.config import config_by_name
from app.model.comment_model import COMMENT_MODEL
from app.model.qa_model import QA_MODEL
from app.service.comment_service import CommentService
from app.service.qa_service import QAService
from app.view.comment_view import create_comment_endpoints
from app.view.qa_view import create_qa_endpoints
from .view.lecture_view import create_code_endpoints
from .view.test_view import create_test_endpoints 
from .view.user_view import create_login_endpoints
from .db import db_conection
from .dto.responseDto import ResponseDTO
from .model.user_model import USER_MODEL
from .model.lecture_model import LECTURE_MODEL
from .service.user_service import UserService
from .service.lecture_service import LectureService

def create_app(config_name="prod"): 
    app = Flask(__name__) 
    app.config.from_object(config_by_name[config_name])
    db = db_conection.Database()
    create_test_endpoints(app)
    # User Endpoint 설정
    
    user_model = USER_MODEL(db)
    user_service = UserService(user_model) 
    create_login_endpoints(app, user_service)

    # Code Endpoint 설정
    lecture_model = LECTURE_MODEL(db)
    lecture_service = LectureService(lecture_model, user_model)
    create_code_endpoints(app, lecture_service)

    # qa Endpoint 설정
    qa_model = QA_MODEL(db)
    qa_service = QAService(qa_model)
    create_qa_endpoints(app, qa_service)

    #comment Endpoint설정
    comment_model = COMMENT_MODEL(db)
    comment_service = CommentService(user_model, comment_model)
    create_comment_endpoints(app, comment_service)

    return app
