A microservice that reads [source data from here](https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv) and exposes it as

[John Hopkins Whiting School of Engineering, Center for Systems Science and Engineering (CSSE)](https://systems.jhu.edu/)

https://github.com/CSSEGISandData

This source code is inspired from [Koushik Kothagal's](https://github.com/koushikkothagal) project

https://www.youtube.com/watch?v=8hjNG9GZGnQ

https://github.com/koushikkothagal/coronavirus-tracker

To run the application:

`gradlew bootRun` and access the data at [http://localhost:8080/metric](http://localhost:8080/metrics).

or

`gradlew bootBuildImage`
`docker run -p 8080:8080 covid-19-csse:3.0.0-SNAPSHOT`
Access the data at [http://localhost:8080/metric](http://localhost:8080/metrics).




