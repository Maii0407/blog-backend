const dotenv = require( 'dotenv' );
dotenv.config();

const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt = require( 'passport-jwt' ).ExtractJwt;

const User = require( '../models/user' );

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${ process.env.SECRETKEY }`;

module.exports = new JwtStrategy( opts, ( jwt_payload, done ) => {
  User.findOne({ userID: jwt_payload.userID }, ( err, user ) => {
    if( err ) { return done( err, false ); }

    if( user ) {
      if( user.userID === `${ process.env.USERID }` ) {
        return done( null, user );
      }
    }
    else {
      return done( null, false )
    }
  });
});