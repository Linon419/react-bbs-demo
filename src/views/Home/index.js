import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../../api";
import "./index.scss";
import ContentContainer from './ContentContainer.js'
import HomeTop from "../HomeTop";



const Home = () => {
  const navigate = useNavigate();
  const { path } = useParams();

  const classifyData = [
    { name: "All posts", categoryId: 0, path: "/total" },
    { name: "Share", categoryId: 1, path: "/share" },
    { name: "Discuss", categoryId: 2, path: "/discuss" },
    { name: "Complain", categoryId: 3, path: "/complain" },
    { name: "Others", categoryId: 4, path: "/complement" },
  ];

  const [currentInedx, setCurrentIndex] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  const itemClick = (index, tpath) => {
    setCurrentIndex(index);
    setCategoryId(index);
    if(path !== tpath){
      navigate(`/home${tpath}`);
    }
  };

  const ItemList = classifyData.map((item, index) => (
    <div
      className={index === currentInedx ? "active item" : "item"}
      key={item.path}
      onClick={() => itemClick(index, item.path)}
    >
      {item.name}
    </div>
  ));

  //写主页面所有的帖子,首先帖子的数据得先拿到，得使用useEffect,然后，将数据渲染

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let map = { total: 0, share: 1, discuss: 2, complain: 3, complement: 4 };
    setCurrentIndex(map[path]);
    getPosts(map[path]).then((res) => {
      let data = res.data;
      //console.log(data)
      setPosts(data);
    });
    return () => {
      map = null;
    };
  }, [categoryId, path]);

  return (
    <div className="home-main">
            <HomeTop />
      <div className="classify">{ItemList}</div>
      <div className="container">
         <ContentContainer posts={posts}></ContentContainer>
      </div>
    </div>
  );
};

export default Home;