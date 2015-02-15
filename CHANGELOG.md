##### 0.2.0 - 15 February 2015

0.2.0 - Stable version

##### New features:
- Skeleton constructor now can use a shortcut passing only path to generator.
- Added autoinjection of ```manifest.js``` file to generator path if it isn't present.
- Added ```scope``` getter/setter method to ```Skeleton```.
- Added ```data``` getter/setter method to ```Skeleton```.

##### Breaking changes
- Scope: rootPath parameter is now called generator.
- Scope: targetPath parameter is now called dest.
- Skeleton constructor now only have two arguments: scope and data.

##### Other
- Important refactoring.
- Adapted tests to new features.
- Minor fixes.

##### 0.1.0 - 05 January 2015

0.1.0 - Stable version