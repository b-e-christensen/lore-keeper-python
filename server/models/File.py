from datetime import datetime
from email.mime import image
from enum import unique
from typing import Text
from server.db import Base
from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship


class File(Base):
    __tablename__ = 'files'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    tagline = Column(String(1000), nullable=True)
    image = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    # unsure if this is something I wish to keep. functionality to allow multiple people to edit a file. 
    collaborators = Column(JSON)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    user = relationship('User')
    contents = relationship('Content', cascade='all,delete')