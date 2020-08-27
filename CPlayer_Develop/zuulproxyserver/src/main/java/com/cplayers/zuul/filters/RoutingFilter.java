package com.cplayers.zuul.filters;

import com.netflix.zuul.ZuulFilter;

public class RoutingFilter extends ZuulFilter {

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() {
		System.out.println("Inside Route Filter");
		return null;
	}

	@Override
	public String filterType() {
		return "routing";
	}

	@Override
	public int filterOrder() {
		return 1;
	}

}
