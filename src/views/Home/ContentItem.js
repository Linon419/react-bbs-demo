import React from "react";
import { useState, useEffect } from "react";
import { getComments, getProfile } from "../../api";
import { parseTime } from "../../utils";
import { useNavigate } from "react-router-dom";

//子组件的props应该是一个单独的item，里面包含了帖子的信心，userId,postId,name,content,
//分别通过userId和postId拿到用户的信息和帖子的信息，这些信息全放在props上
const ContentItem = (props) => {
  //console.log(props)
  const [userInfo, setUserInfo] = useState([]);
  const [commentsInfo, setCommentsInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getProfile(props.item.userId).then((res) => {
      let data = res.data;
      // console.log("userinfo"+res)
      setUserInfo(data);
    });
  }, [props.item.userId]);
  useEffect(() => {
    getComments(props.item.postId).then((res) => {
      let data = res.data;
      //console.log(data)
      setCommentsInfo(data);
    });
  }, [props.item.postId]);

  const clickItem = (postId) => {
    navigate(`/postDetail/${postId}`)
  };

  const tagMap = { 1: "Share", 2: "Discussion", 3: "Complain", 4: "Others" };

  const tag = tagMap[props.item.category];



  return (
    <div
      className="content-item"
      onClick={() => clickItem(props.item.postId)}
    >
      <div className="avator">
        <img src={process.env.REACT_APP_AVATAR_BASEURL + userInfo.avator} alt="" />
      </div>
      <div className="content">
        <div className="title">{props.item.title}</div>
        <div className="detail">
          <span className="share">{tag}</span>·
          <span className="user">{userInfo.name}</span>·
          <span className="time">{parseTime(props.item.time)}</span>
        </div>
      </div>
      <div className="counts">
        {commentsInfo.length > 0 ? (
          <div className="count">{commentsInfo.length}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ContentItem;
