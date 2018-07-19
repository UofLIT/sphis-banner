import { h, Component } from "preact";
import style from "./style.scss";

const Slide = ({title, text, link, background}) => (
	<div class={style.slide}>
		<div class="d-flex flex-column flex-md-row">
			<div class="flex-grow">
				<div class={style['slide-image']} style={{backgroundImage: 'url(' + background + '/image_large)'}}>
				</div>
			</div>
			<div class="flex-grow d-flex flex-column justify-content-center p-2 pl-md-4 mr-md-4">
				<a href={link}>
					<h2>{title}</h2>
					<h3>{text}</h3>
				</a>
			</div>
		</div>
	</div>
);
export default Slide;