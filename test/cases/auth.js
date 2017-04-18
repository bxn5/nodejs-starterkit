// module dependencies
const authConf 	= require(`${__root}/server/api/auth/config`);
const faker 		= require('faker');

describe('Auth', () => {
	it('Login', done => {
		let credentials = {
			email: 'admin@admin',
			password: 'admin'
		}

		request(`localhost:${port}`)
			.post('/auth' + authConf.login.path)
			.send(credentials)
			.expect(200)
			.expect(res => {
				expect(res.body.status).to.equal('ok')
				expect(res.body.data).to.have.all.keys('profile', 'token');
				global.Authorization = res.body.data.token;
				global.profile = res.body.data.profile;
			})
			.end(done)
	})

	it('Wrong credentials', done => {
		let credentials = {
			email: 'admin15555@1111.ru',
			password: 'admin12'
		}

		request(`localhost:${port}`)
			.post('/auth' + authConf.login.path)
			.send(credentials)
			.expect(404)
			.expect(res => {
				expect(res.body.status).to.equal('not found');
				expect(res.body.error.message).to.equal(vars.validator.incorrectCreds);
			})
			.end(done)
	})

	it('Get profile', done => {
		let code = service.expectedCode(authConf.profile.access, profile);

		request(`localhost:${port}`)
			.get('/auth' + authConf.profile.path)
			.set({Authorization})
			.expect(code)
			.expect(res => {
				if (code == 200)
					expect(res.body.data).to.have.all.keys('profile', '_id', 'email');
			})
			.end(done)
	})

	it('Incorrect token', done => {
		request(`localhost:${port}`)
			.get('/auth' + authConf.profile.path)
			.set({Authorization: Authorization + '1'})
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal(vars.validator.invalidToken)
			})
			.end(done)
	})

	it('Without token', done => {
		request(`localhost:${port}`)
			.get('/auth' + authConf.profile.path)
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal(vars.validator.token)
			})
			.end(done)
	})

	it('Register', done => {
		let password = faker.internet.password();
		let email = faker.internet.email();

		let credentials = {
			email,
			password
		}

		request(`localhost:${port}`)
			.post('/auth' + authConf.register.path)
			.send(credentials)
			.expect(200)
			.expect(res => {
				expect(res.body.status).to.equal('ok')
				expect(res.body.data).to.have.all.keys('profile', 'token');
			})
			.end(done)
	})

	it('Register incorrect (email exists)', done => {
		let credentials = {
			email: 'admin@admin',
			password: 'admin'
		}


		request(`localhost:${port}`)
			.post('/auth' + authConf.register.path)
			.send(credentials)
			.expect(400)
			.expect(res => {
				expect(res.body.error.message).to.equal(vars.validator.userExist)
			})
			.end(done)
	})
	
  it('Validation failed', done => {
    let credentials = {
      email: 'admin',
      password: 'a'
    }

    request(`localhost:${port}`)
      .post('/auth' + authConf.register.path)
      .send(credentials)
      .expect(400)
      .expect(res => {
      	expect(res.body.error.message).to.be.equal(vars.validator.validation);
      	expect(res.body.error).to.have.keys('email', 'password', 'message', 'route');
      	expect(res.body.error.email).to.contain.all.keys('message', 'value', 'path');
      	expect(res.body.error.password).to.contain.all.keys('message', 'value', 'path');
      })
      .end(done)
  })
})