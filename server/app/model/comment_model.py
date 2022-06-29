import re


class COMMENT_MODEL:
    def __init__(self, db_conection):
        self.db_connection = db_conection

    def saveComment(self, user_seq, qa_seq, comment_content, qa_createtime):
        SQL = "insert into comment(user_seq, qa_seq, comment_content, comment_createtime) values(%s, %s, %s, %s)"
        result = self.db_connection.executeAll(SQL, [user_seq, qa_seq,comment_content , qa_createtime])
        self.db_connection.commit()
        return result
    
    def getComment(self, qa_seq):
        print(qa_seq)
        SQL = "select * from comment as c, user as u where qa_seq = %s and c.user_seq = u.user_seq  ;"
        result = self.db_connection.executeAll(SQL, [qa_seq])
        return result