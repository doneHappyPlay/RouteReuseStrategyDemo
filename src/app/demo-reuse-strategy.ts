/**
 * Created by dhp on 2018/8/19.
 */
import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class DemoReuseStrategy implements RouteReuseStrategy {
  private static waitDelete: string;
  public static storedRoutes: Map<string, DetachedRouteHandle> = new Map<string, DetachedRouteHandle>();

  constructor() {
  }

  //  删除快照
  public static deleteRouteSnapshot(name: string): void {
    if (this.storedRoutes.get(name)) {
      this.storedRoutes.delete(name);
    } else {
      this.waitDelete = name;
    }
  }

  //  是否缓存[离开路由时触发]
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  //  缓存组件[离开路由时触发]
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (this.waitDelete && this.waitDelete === this.getRouteUrl(route)) {
      this.waitDelete = null;
      return;
    }
    this.storedRoutes.set(this.getRouteUrl(route), handle);
  }

  //  是否还原[进入路由时触发]
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.storedRoutes.get(this.getRouteUrl(route));
  }

  //  还原路由[进入路由时触发]
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    return this.storedRoutes.get(this.getRouteUrl(route));
  }

  //  是否复用路由[进入路由时触发]
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const result: boolean = future.routeConfig === curr.routeConfig;
    return result;
  }

  //  拿到当前路由
  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url;
  }
}
