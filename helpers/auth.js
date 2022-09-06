module.exports.checkAuth = function( request, response, next) {
  const userid = request.session.userid

  if(!userid) {
    response.redirect('/login')
  }
  next()
}