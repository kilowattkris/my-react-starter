/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

console.log(chalk.blue('Generating minified bundle for production. This may take a few moments...'));

webpack(webpackConfig).run((err, stats) => {
  if(err){ //Fatal error occured, stop here!
      console.log(chalk.red(err));
      return 1;
  }
  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
      return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if(jsonStats.hasWarnings){
      console.log(chalk.yellow('Webpack generated the following warnings: '));
      jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  //if we get this far, the build has successded
  console.log(chalk.green('Your app has been built for production and written to /dist'));

  return 0;
});
