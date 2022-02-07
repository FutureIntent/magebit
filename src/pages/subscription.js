import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import styles from './../css/subscription.module.css';
import validate from './../scripts/subscription_validation.js';
import { URLContext } from './../context/back_end_url.js';

function Subscription() {

	const BackEndURL = useContext(URLContext);

	useEffect(() => {
		//console.log(validation);
		//console.log("Subscription status: " + subscribe);
	});

	//store user input
	const [input, setInput] = useState({
		email: null,
		checkbox: false
	});

	//define subscription success
	const [subscribe, setSubscribe] = useState(false);

	//error messages
	const [errMessage, setErrMessage] = useState();

	//user's input handler
	function handleInput(event) {
		const inputType = event.target.type;

		inputType === "checkbox" ?
			setInput(prevState => {
				prevState.checkbox = event.target.checked;

				return {...prevState}
			}) :
			setInput(prevState => {
				prevState.email = event.target.value;

				return {...prevState}
			})
	}

	//validation
	const validation = useMemo(() => validate(input.email, input.checkbox), [input]);

	//validate user's input by FRONT-END!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*function handleSubmit(event) {

		const data = validation;

		if (data.status == true) {
			setErrMessage(data.message);
			setSubscribe(true);
		} else {
			setErrMessage(data.message);
			setSubscribe(false);
		}
		event.preventDefault();
	}*/

	//fetch, validate and store user's input by BACK-END!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	function handleSubmit(event) {

		event.preventDefault();

		if (input.checkbox == false) return setErrMessage("You must accept the terms and conditions");

		//fetch data
		fetch(`${BackEndURL}/subscriber/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: input.email
			})
		})
			.then(res => res.json())
			.then(res => {
				if (res.status == true) {
					setErrMessage(null);
					setSubscribe(true)
				} else {
					setErrMessage(res.message);
				}
			})
			.catch(err => setErrMessage("Subscription error"))
	}



	//conditional styles
	const redBorder = useRef();
	const hideInput = useRef();

	errMessage ? redBorder.current = { borderColor: '#B80808' }
		       : redBorder.current = null;

	subscribe ? hideInput.current = { display: 'none' }
		      : hideInput.current = null;

	return (
		<div className={styles.background}>

			<div className={styles.column_2}>
			</div>

			<div className={ styles.column_1}>
				<div className={styles.header}>
					<div className={styles.logo_bar}>
						<img className={styles.logo_image} alt="logo"/>
						<span className={styles.logo_text}>pineapple.</span>
					</div>
					<div className={styles.nav_bar}>
						<a className={styles.nav_text} href="#">About</a>
						<a className={styles.nav_text} href="#">How it works</a>
						<a className={styles.nav_text} href="#">Contact</a>
					</div>
				</div>
				<div className={ styles.mid_wrapper}>
					<form className={styles.mid_section} onSubmit={ handleSubmit }>
					{subscribe && <img className={styles.mid_prize} alt="prize"/>}
					<h1 className={ styles.mid_header }>
							{!subscribe ? "Subscribe to newsletter"
								        : "Thanks for subscribing!"}
					</h1>
					<p className={styles.mid_paragraph}>
							{!subscribe ? "Subscribe to our newsletter and get 10% discount on pineapple glasses."
								        : "You have successfully subscribed to our email listing. Check your email for the discount code."}
						</p>
						<div className={styles.mid_inputArea} style={hideInput.current}>
							<input className={styles.mid_input} type="text" placeholder="Type your email address here..." onChange={handleInput} style={redBorder.current}></input>
							<button type="submit" className={styles.mid_button} style={ redBorder.current }></button>
						</div>
						<span id='err_messages' name='err_messages' value={null} className={styles.mid_errMessage}>{errMessage && errMessage}</span>
						<div className={styles.mid_agreement} style={hideInput.current}>
							<input type="checkbox" className={styles.mid_checkbox} checked={input.checkbox} onChange={handleInput } />
						<span className={styles.mid_agreement_text}>I agree to <a href="#" className={styles.mid_agreement_text_link}>terms of service</a></span>
					</div>
					<hr className={styles.mid_line} />
					<div className={styles.mid_icons}>
						<a href="#" className={styles.mid_icons_fb}/>
						<a href="#" className={styles.mid_icons_inst}/>
						<a href="#" className={styles.mid_icons_twit}/>
						<a href="#" className={styles.mid_icons_yt}/>
					</div>
					</form>
				</div>
			</div>
		</div>
		);
}

export default Subscription;