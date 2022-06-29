const dotenv = require( 'dotenv' );
dotenv.config();

const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt = require( 'passport-jwt' ).ExtractJwt;
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${ process.env.SECRETKEY }`;

module.exports = new JwtStrategy( opts, ( jwt_payload, done ) => {
  if( jwt_payload.userID ===`${ process.env.USERID }` ) {
    return done( null, true );
  }

  return done( null, false );
});