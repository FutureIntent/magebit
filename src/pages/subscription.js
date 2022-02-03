import React from 'react';
import styles from './../css/subscription.module.css';

function Subscription() {
	return (
		<div className={styles.background}>

			<div className={styles.column_2}>
			</div>

			<div className={ styles.column_1}>
				<div className={styles.header}>
					<div className={styles.logo_bar}>
						<img className={styles.logo_image} />
						<span className={styles.logo_text}>pineapple.</span>
					</div>
					<div className={styles.nav_bar}>
						<a className={styles.nav_text} href="#">About</a>
						<a className={styles.nav_text} href="#">How it works</a>
						<a className={styles.nav_text} href="#">Contact</a>
					</div>
				</div>
				<div className={ styles.mid_wrapper}>
				<div className={styles.mid_section}>
					<h1 className={ styles.mid_header }>
						Subscribe to newsletter
					</h1>
					<p className={styles.mid_paragraph}>
						Subscribe to our newsletter and get 10% discount on pineapple glasses.
					</p>
					<input className={styles.mid_input} type="text" placeholder="Type your email address here..."></input>
					<div className={styles.mid_agreement}>
						<input type="checkbox" className={styles.mid_checkbox} />
						<span className={styles.mid_agreement_text}>I agree to <a href="#" className={styles.mid_agreement_text_link}>terms of service</a></span>
					</div>
					<hr className={styles.mid_line} />
					<div className={styles.mid_icons}>
						<a href="#" className={styles.mid_icons_fb}/>
						<a href="#" className={styles.mid_icons_inst}/>
						<a href="#" className={styles.mid_icons_twit}/>
						<a href="#" className={styles.mid_icons_yt}/>
					</div>
					</div>
				</div>
			</div>
		</div>
		);
}

export default Subscription;