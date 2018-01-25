# project-cli

> 基于webpack模板改造，一个集成登录、菜单、动态路由生成、模块配置注入等功能，适合集成各个模块的脚手架。

### 脚手架优化点

1. 构建速度
2. 首屏加载速度

### 功能

1. 基础登录功能
2. 动态路由生成
3. 基础菜单
4. 基础布局
5. 模块配置注入机制

### 使用方法

如果还没安装过vue-cli，请执行：

``` bash
npm install -g vue-cli
```

如果还设置NPM包源，请执行：

``` bash
npm set registry http://115.29.205.204:10001
```

初始化项目脚手架：
``` bash
vue init StrongSoftGitHub/project-cli [脚手架名称，格式：合同号-项目名称-cli]
```

### 后端支撑
1、通用接口：basic/data
2、配置文件接口：basic/config
3、key为s_user_validate的用户登录接口，如：
```
<mapping name="s_user_validate" title="用户登录接口" remark="用户登录接口" author="strong" target="4.0">
    <schema>
      <item name="u_id" remark="主键ID"/>
      <item name="uname" remark="账号"/>
      <item name="realname" remark="用户名" />
      <item name="roleids" remark="角色ID" />
      <item name="adcd" remark="区划码" />
      <item name="radcd" remark="地市区划码" />
      <item name="adnm" remark="区划名称" />
      <item name="unitid" remark="单位编号" />
      <item name="unitname" remark="单位名称" />
      <item name="departid" remark="所属部门" />
      <item name="password" remark="用户密码" />
    </schema>
    <item conn_name="Conn_Main">
      <![CDATA[
        select
          u_id,
          uname,
          realname,
          roleids,
          b.adcd,
          case when substr(b.adcd,5,2)='00' then b.adcd else substr(b.adcd,1,4)||'00' end as radcd,
          c.adnm,
          b.unitid,
          b.unitname,
          a.departid,
          a.upwd password
        from sys_user a
        left join l05_unit b on b.unitid=a.ssbm
        left join ss_area c on c.adcd=b.adcd
        where uname=@username and upwd=@password and isdelete!=1
      ]]>
    </item>
  </mapping>
```
4、key为select_sys_menu_list的菜单通用接口，如：
```
<mapping name="select_sys_menu_list" title="获取菜单列表" remark="获取菜单列表" target="4.0" author="strong">
    <item conn_name="Conn_Extend">
      <![CDATA[
       select
         menuid,
         parentid,
         page_id,
         module_id,
         orderid,
         args,
         mname,
         isurl,
         navigateuri,
         imagepath,
         menuimage,
         isdefault,
         iseanbled as isenable,
         isdisplay,
         nheight,
         nwidth,
         module_params
       from sys_menu a
       where menuid in (
         select distinct menuid from sys_popedom where (
           (objecttype=1 and instr(','||(select roleids from sys_user where u_id=@user_id)||',', ','||objectid||',')>0)
             or
           (objecttype=2 and objectid=@user_id)
         ) and menuid not in (
           select menuid from sys_popedom where objecttype=3 and objectid=@user_id
         ) and poptype='Select'
       ) and page_id=@page_id and a.iseanbled=1
       order by a.parentid,a.orderid asc
      ]]>
    </item>
  </mapping>
```

### 常用命令

- 安装依赖：npm install
- 启动本地服务器：npm run dev
- 代码规范检测：npm run lint
- 自动修复代码规范问题：npm run fix