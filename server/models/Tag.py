from server.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Tag(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    file_id = Column(Integer, ForeignKey('files.id'))

    file = relationship('File')
    
