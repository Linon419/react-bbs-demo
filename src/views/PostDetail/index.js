import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComments, getProfile, postDetail, addComment,deleteComment } from "../../api";
import { parseTime } from "../../utils";
import { useSelector } from "react-redux";

import { Button, notification } from "antd";
import { SmileOutlined, FrownTwoTone } from "@ant-design/icons";
import "./index.scss";
import { useRef } from "react";

const CommentItem = ({ comment }) => {
  const [profileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    getProfile(comment.userId).then((res) => {
      setProfileInfo(res.data);
      console.log(res.data)
    });
  }, [comment.userId]);
  // console.log(process)
  // console.log(process.env)
  // console.log(process.env.REACT_APP_AVATAR_BASEURL)
  return (
    <div className="comment-item">
      <div className="avator">
        <img
          src={process.env.REACT_APP_AVATAR_BASEURL + profileInfo.avator}
          alt=""
        />
      </div>
      <div className="message">
        <span className="name">{profileInfo.name}</span>·
        <span className="time">{parseTime(comment.time)}</span>
      </div>
      <div className="commnets">{comment.content}</div>
    </div>
  );
};

const AddComment = ({ setCommentInfo, commentInfo }) => {
  const isLogined = useSelector((state) => state.user.isLogined);
  const loginedUser = useSelector((state) => state.user.loginedUser);
  const contentRef = useRef();
  const { postId } = useParams();

  const submit = (e) => {
    e.preventDefault();
    if (!isLogined) {
      notification.open({
        message: "Failed to reply！",
        description: "You are not logged in and cannot reply at this time. Please login first and then reply!！",
        icon: <FrownTwoTone style={{ color: "#ff4c4c" }} />,
      });
    } else {
      if (!contentRef.current.value) {
        notification.open({
          message: "Failed to reply！",
          description: "Reply content is empty！",
          icon: <FrownTwoTone style={{ color: "#ff4c4c" }} />,
        });
      } else {
        addComment(postId, contentRef.current.value).then((res) => {
          if (res.data.code === 0) {
            let data = {
              commentId: 56,
              content: contentRef.current.value,
              postId: postId,
              time: new Date().toString(),
              userId: loginedUser.userId,
            };
            let newInfo = [...commentInfo]
            newInfo.unshift(data);
            setCommentInfo(newInfo);
            notification.open({
              message: "Reply successfully！",
              description: "You have successfully posted a reply",
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
            contentRef.current.value = "";
          } else {
            notification.open({
              message: "Failed to reply！",
              description: "Sorry, an unknown error occurred！",
              icon: <FrownTwoTone style={{ color: "#ff4c4c" }} />,
            });
          }
        });
      }
    }
  };

  return (
    <div className="add-comments">
      <div className="header">
        <div className="left">Add a new comment</div>
      </div>
      <div className="form">
        <textarea ref={contentRef} className="textarea"></textarea>
      </div>
      <div className="submit" onClick={submit}>
        <Button className="button">reply</Button>
      </div>
    </div>
  );
};

const PostDetail = () => {
  let { postId } = useParams();
  const [userId, setUserId] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  const [commentInfo, setCommentInfo] = useState([]);
  const [contentLines, setContentLines] = useState([]);

  useEffect(() => {
    postDetail(postId).then((res) => {
      let data = res.data;
      setPostInfo(data);
      setUserId(data.userId);
      setContentLines(res.data.content.split("\n"));
    });
  }, [postId]);

  useEffect(() => {
    getProfile(userId).then((res) => {
      setUserInfo(res.data);
    });
  }, [userId]);

  useEffect(() => {
    getComments(postId).then((res) => {
      setCommentInfo(res.data);
    });
  }, []);

  return (
    <div className="post-detail">
      <div className="header-content">
        <div className="header">
          <div className="title">{postInfo.title}</div>
          <div className="message">
            <span className="name">{userInfo.name}</span>·
            <span className="time">{parseTime(postInfo.time)}</span>
          </div>
          <div className="avator">
            <img
              src={process.env.REACT_APP_AVATAR_BASEURL + userInfo.avator}
              alt=""
            />
          </div>
        </div>
        <div className="post-content">
          {contentLines
            ? contentLines.map((line, index) => <p key={index}>{line}</p>)
            : null}
        </div>
      </div>
      <div className="comments">
        <div className="top">
          <span>{commentInfo.length}</span>replys·
          <span>{new Date().toString()}</span>
        </div>
        <div className="comment">
          {commentInfo.map((comment) => (
            <CommentItem key={comment.time} comment={comment}></CommentItem>
          ))}

        </div>
      </div>
      <div className="add-comments">
        <AddComment
          setCommentInfo={setCommentInfo}
          commentInfo={commentInfo}
        ></AddComment>
      </div>
    </div>
  );
};

export default PostDetail;
