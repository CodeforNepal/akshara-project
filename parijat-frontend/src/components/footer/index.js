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
					>
						{'{ '}सोर्स कोड{' }'}
					</a>
				</li>
				<li className={style.Footer__ListItem}>
					<a
						href="https://goo.gl/forms/XfIMqXmRMp3MMMMh2"
						target="_blank"
					>
						सुझाव
					</a>
				</li>
				<li className={style.Footer__ListItem}>
					<a
						href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AMU2VD5FMCHCJ"
						target="_blank"
					>
						सहयोग
					</a>
				</li>
			</ul>
		</div>
	</footer>
);

export default Footer;
