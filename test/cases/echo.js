describe('Echo', () => {
  it('Echo API request', done => {
    request(`localhost:${port}`)
      .get('/echo')
      .expect(200)
      .expect(res => {
        expect(res.body.message).to.be.equal('Hello world!');
      })
      .end(done);
  });
});