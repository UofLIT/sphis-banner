import { h, Component } from "preact";
import PageVisibility from 'react-page-visibility';
import Swiper from 'react-id-swiper/lib/custom';
import Slide from "../slide";
import style from "./style.scss";

export default class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			slides: [],
		};
		this.delay = props.delay || 5000;
	}
	
	componentDidMount = () => {
		this.fetchSlides();
	};

	fetchSlides = async () => {
		let prod = process.env.NODE_ENV === 'production';
		let input = prod ?
			'/sphis/images/banners/tinymce-jsonimagefolderlisting' :
			'/test.json'
		let init = prod ?
			{
				method: 'POST',
				body: 'rooted=True&document_base_url=/',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
			} :
			{};
		let response = await fetch(input, init);
		let json = await response.json();
		let images = json.items.filter(item => item.portal_type === 'Image');
		let slides = images.map(({ title, description, url }) => {
			let [text, link] = description.split('\r\n');
			return (
				<div key={url}>
					<Slide
						title={title}
						text={text}
						link={link}
						background={url}
						/>
				</div>
			);
		});
		this.setState({
			slides,
		})
	};
	
	handleVisibilityChange = isVisible => {
		if (isVisible) {
			this.reactIdSwiper.swiper.autoplay.start();
		}
		else {
			this.reactIdSwiper.swiper.autoplay.stop();
		}
	};

	handleMouseEnter = e => {
		this.reactIdSwiper.swiper.autoplay.stop();
	};

	handleMouseLeave = e => {
		this.reactIdSwiper.swiper.autoplay.start();
	};

	render = () => {
		const params = {
			loop: true,
			autoplay: {
				delay: this.delay,
				disableOnInteraction: false,
			},
			simulateTouch: false,
			navigation: {
				prevEl: '.carousel-control-prev',
				nextEl: '.carousel-control-next',
			},
			renderPrevButton: () => (
				<div class={`carousel-control-prev d-none d-md-flex ${style.prevButton}`} role="button">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</div>
			),
			renderNextButton: () => (
				<div class={`carousel-control-next d-none d-md-flex ${style.nextButton}`} role="button">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</div>
			),
      spaceBetween: 5,
    };
		return !this.state.slides.length ? '' : (
			<div id={style.banner} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
				<PageVisibility onChange={this.handleVisibilityChange}>
					<Swiper {...params}  ref={reactIdSwiper => this.reactIdSwiper = reactIdSwiper }>
						{this.state.slides}
					</Swiper>
				</PageVisibility>
			</div>
		);
	};
}