import React from 'react';
import '../css/lectureCard.css'
import starImg from '../image/icons8-star-32.png';
import thumbImg from '../image/icons8-thumbs-up-32.png';
import { Link } from "react-router-dom";
import { call } from '../service/APIService';



function LinkwithLog(props) {
	const isLoggedIn = props.sessionV;
	if (isLoggedIn !== null) {
		return (
			<Link
				to={{
					pathname: "/lectureIntro",
					state: {
						data: props.lecture,
					}
				}}
			><div id="lecture_name"><span ><b className="lecture_title">{props.lecture.lecture_content_title}</b></span></div></Link>
		);
	}
	else {
		return (
			<Link to="/login"><div id="lecture_name"><span ><b className="lecture_title">{props.lecture.lecture_content_title}</b></span></div></Link>
		);
	}

}

function clickLike(sessionV, lecture, lecturecontent) {
	if (sessionV !== null) {
		var queryString = "/lectures/" + lecture + "/lectureContent/" + lecturecontent + "/like";
		//var queryString = "/lectures/1/lectureContent/1/like"
		call(queryString, "PATCH")
			.then(
				response =>{
					console.log(response["data"])
					window.location.reload()
				}
			
			)
	}
}

const LectureCard = (props) => {
	const lecture_content_description = props.lecture.lecture_content_description;
	const lecture_content_difficulty = props.lecture.lecture_content_difficulty;
	const like_count = props.lecture.like_count;

	return (

		<div id="lecture">
			<div id="lecture_card_top">
				<LinkwithLog sessionV={props.sessionV} lecture={props.lecture}></LinkwithLog>

				<div id="lecture_content_description"><span>{lecture_content_description}</span></div>
			</div>
			<div id="lecture_card_bottom">
				<div id="lecture_content_difficulty" style={{ width: `${lecture_content_difficulty ? lecture_content_difficulty * 2 + 'rem' : '10rem'}` }}>
					<section>
						{Array.from({ length: lecture_content_difficulty }, (_, i) => <img key={i} src={starImg} alt="hard" />)}
					</section>
				</div>
				<div id="lecture_bar"></div>
				<div id="like_count">
					<button id="Likebutton" onClick={() => clickLike(props.sessionV, props.lecture.lecture_seq, props.lecture.lecture_content_seq)}><img src={thumbImg} alt="like" /></button><div id="like_count_n">{like_count}</div>
				</div>
			</div>
		</div>
	);


};



export default LectureCard;
