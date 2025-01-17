package com.cplayers.zuul.proxyserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

import com.cplayers.zuul.filters.ErrorFilter;
import com.cplayers.zuul.filters.PostFilter;
import com.cplayers.zuul.filters.PreFilter;
import com.cplayers.zuul.filters.RoutingFilter;

@SpringBootApplication
@EnableZuulProxy
public class ProxyserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProxyserverApplication.class, args);
	}

	@Bean
	public PreFilter preFilter() {
		return new PreFilter();
	}

	@Bean
	public PostFilter postFilter() {
		return new PostFilter();
	}

	@Bean
	public ErrorFilter errorFilter() {
		return new ErrorFilter();
	}

	@Bean
	public RoutingFilter routeFilter() {
		return new RoutingFilter();
	}

}
