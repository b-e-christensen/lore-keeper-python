from datetime import datetime
from enum import unique
from server.db import Base
from sqlalchemy import Column, Integer, String, ARRAY, ForeignKey, DateTime, Float, BLOB
from sqlalchemy.orm import relationship


class Content(Base):
    __tablename__ = 'contents'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    # to decide where it falls in the file structure. 
    number = Column(Float, nullable=False)
    content = Column(String(2000), nullable=True)
    image = Column(BLOB)
    # to show who made the content? 
    user_id = Column(Integer, ForeignKey('users.id'))
    file_id = Column(Integer, ForeignKey('files.id'))

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    user = relationship('User')
    tags = relationship('Tag', cascade='all,delete')