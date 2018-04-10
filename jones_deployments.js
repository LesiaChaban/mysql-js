var deployments = {};


/* The test deployment is used in automated testing of the Jones projects
*/
deployments.test = function(properties) {
  var hostname, mgmport, sqlport;
  hostname =  process.env["HOSTNAME"] || "localhost";
  mgmport = process.env["PORT_MGMD"] || "1186";
  sqlport = process.env["PORT_SQL1"] || "3306";

  properties.mysql_host = hostname;
  properties.mysql_port = sqlport;
  properties.ndb_connectstring = hostname + ":" + mgmport;
};

/* This deployment uses an environment set up by mysql-test-run:
     ./mtr --debug --start ndb.ndb_basic
*/
deployments.mtr = function(properties) {
  properties.mysql_host = "127.0.0.1";
  properties.mysql_port = 13001;
  properties.ndb_connectstring = "localhost:13000";
};

/* Example of a deployment function defining a production environment.
   This function would be invoked from the code:
     var properties = new jones.ConnectionProperties("mysql", "production");
*/
deployments.production = function(properties) {
  properties.mysql_host = "rw.db.prod.mysite.com";
  properties.mysql_user = "prod_web_user";
  properties.mysql_password = "secretPassword";
  properties.database = "my_app_db";
};


/* Another example of a deployment function; this one might define a 
   connection to a read-only slave server.
*/
deployments.prod_slave = function(properties) {
  deployments.production(properties);
  properties.mysql_host = "ro.db.prod.mysite.com";   // read-only host
};

module.exports = deployments;
