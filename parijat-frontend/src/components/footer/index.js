import { h } from 'preact';
import style from './style.css';

const Footer = () => (
	<footer className={style.Footer}>
		<div className={style.Footer__Content}>
			<ul className={style.Footer__List}>
				<li className={style.Footer__ListItem}>
					<a href="/about">हाम्रो बारेमा</a>
				</li>
				<li className={style.Footer__ListItem}>
					<a
						href="https://github.com/Code4Nepal/akshara-project"
						target="_blank"
						rel="noopener noreferrer"
					>
						{'{ '}सोर्स कोड{' }'}
					</a>
				</li>
				<li className={style.Footer__ListItem}>
					<a
						href="https://goo.gl/forms/XfIMqXmRMp3MMMMh2"
						target="_blank"
						rel="noopener noreferrer"
					>
						सुझाव
					</a>
				</li>
				<li className={style.Footer__ListItem}>
					<a
						href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AMU2VD5FMCHCJ"
						target="_blank"
						rel="noopener noreferrer"
					>
						सहयोग
					</a>
				</li>
				<li className={style.Footer__ListItem}>
					<a href="/fair-use">उचित उपयोग</a>
				</li>
			</ul>
			<a href="https://codefornepal.org/" target="_blank"><img className={style.Footer__c4n_logo} src="/assets/c4n_logo.png" /></a>
			<div className={style.Footer__HostMessage}>Hosted on <a href="https://digitalocean.com" target="_blank">DigitalOcean</a></div>
		</div>
	</footer>
);

export default Footer;
