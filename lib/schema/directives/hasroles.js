const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver }   = require('graphql');

module.exports = class HasRoleDirective extends SchemaDirectiveVisitor {

  static get name() {
    return 'hasRoles';
  }

  visitFieldDefinition( field ) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async( obj, args, context, info ) => {
      if ( typeof context.token !== 'object' ) {
        throw new Error('Unauthorized');
      }

      const { roles = [] } = this.args;
      const { roles: has } = context.token;

      if ( !roles.every( role => has.includes( role ) ) ) {
        const missing = roles.filter( role => !has.includes( role ) );
        throw new Error( `Forbidden: missing role(s) ${ missing }` );
      }

      return resolve.call( this, obj, args, context, info );
    };
  }

};
