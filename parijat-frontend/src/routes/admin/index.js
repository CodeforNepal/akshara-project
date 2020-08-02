import { h, Component } from 'preact';
import { Switch, useHistory } from 'react-router-dom';
import { LogOut } from 'preact-feather';
import PrivateRoute from '../../components/router/PrivateRoute';
import AdminIndexSync from '../../components/admin/AdminIndexSync';
import AdminUsers from '../../components/admin/AdminUsers';
import AdminMenu from '../../components/admin/AdminMenu';
import AdminWelcome from '../../components/admin';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Button from '../../components/button';
import AdminComponent from '../../components/admin';

import { login, admin } from '../../api';
import style from './style';


function UserMenu() {
	const history = useHistory();

	return (
		<Button onClick={() => { history.push('/login') }}><LogOut /> बाहिर</Button>
	);
}

function Admin() {
	return (
		<div>
			<Header>
				<div className={style.Header__Content}>
					<h2>व्यवस्थापन क्षेत्र</h2>
					<UserMenu />
				</div>
			</Header>
			<div className={style.Admin__Container}>
        <AdminMenu />
				<div className={style.Admin__Content}>
					<Switch>
						<PrivateRoute exact path="/admin">
							<AdminWelcome />
						</PrivateRoute>
						<PrivateRoute path="/admin/index-sync">
							<AdminIndexSync />
						</PrivateRoute>
						<PrivateRoute path="/admin/users">
							<AdminUsers />
						</PrivateRoute>
					</Switch>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Admin;
