export interface GenTablePageQuery {
  name?: string // 表名称
  comment?: string // 表注释
  swaggerComment?: string // swagger注释
  dsId?: string // 数据源
  author?: string // 作者
  subId?: string // 关联子表的ID
  subJavaFieldName?: number // 子表关联的外键Java字段名
  entityName?: string // 实体名称
  entitySuperClass?: string // 父类
  superClass?: string // 实体父类
  parent?: string // 父包名
  plusModuleName?: string // 前端模块名
  plusApplicationName?: string // 前端应用名
  serviceName?: string // 服务名
  moduleName?: string // 模块名
  childPackageName?: string // 子包名
  isTenantLine?: boolean // 行级租户注解
  dsValue?: string // 数据源
  isDs?: boolean // 数据源级租户注解
  isLombok?: boolean // lombok
  isChain?: boolean // 链式模型
  isColumnConstant?: boolean // 是否生成字段常量
  genType?: string // 生成代码方式
  outputDir?: string // 后端生成路径
  frontOutputDir?: string // 前端生成路径
  tplType?: string // 使用的模板
  popupType?: string // 弹窗方式
  addAuth?: string // 新增按钮权限编码
  editAuth?: string // 编辑按钮权限编码
  deleteAuth?: string // 删除按钮权限编码
  viewAuth?: string // 查看按钮权限编码
  copyAuth?: string // 复制按钮权限编码
  addShow?: boolean // 新增按钮是否显示
  editShow?: boolean // 编辑按钮是否显示
  deleteShow?: boolean // 删除按钮是否显示
  copyShow?: boolean // 复制按钮是否显示
  viewShow?: boolean // 详情按钮是否显示
  options?: string // 其它生成选项
  remarks?: string // 备注
  menuParentId?: string // 上级菜单ID
  menuApplicationId?: string // 所属应用ID
  menuName?: string // 菜单名称
  menuIcon?: string // 菜单图标
  treeParentId?: string // 父ID字段名
  treeName?: string // 名称字段名

  daterange?: any
}

export interface GenTableSaveVO {
  name?: string // 表名称
  comment?: string // 表注释
  swaggerComment?: string // swagger注释
  dsId?: string // 数据源
  author?: string // 作者
  subId?: string // 关联子表的ID
  subJavaFieldName?: number // 子表关联的外键Java字段名
  entityName?: string // 实体名称
  entitySuperClass?: string // 父类
  superClass?: string // 实体父类
  parent?: string // 父包名
  plusModuleName?: string // 前端模块名
  plusApplicationName?: string // 前端应用名
  serviceName?: string // 服务名
  moduleName?: string // 模块名
  childPackageName?: string // 子包名
  isTenantLine?: boolean // 行级租户注解
  dsValue?: string // 数据源
  isDs?: boolean // 数据源级租户注解
  isLombok?: boolean // lombok
  isChain?: boolean // 链式模型
  isColumnConstant?: boolean // 是否生成字段常量
  genType?: string // 生成代码方式
  outputDir?: string // 后端生成路径
  frontOutputDir?: string // 前端生成路径
  tplType?: string // 使用的模板
  popupType?: string // 弹窗方式
  addAuth?: string // 新增按钮权限编码
  editAuth?: string // 编辑按钮权限编码
  deleteAuth?: string // 删除按钮权限编码
  viewAuth?: string // 查看按钮权限编码
  copyAuth?: string // 复制按钮权限编码
  addShow?: boolean // 新增按钮是否显示
  editShow?: boolean // 编辑按钮是否显示
  deleteShow?: boolean // 删除按钮是否显示
  copyShow?: boolean // 复制按钮是否显示
  viewShow?: boolean // 详情按钮是否显示
  options?: string // 其它生成选项
  remarks?: string // 备注
  menuParentId?: string // 上级菜单ID
  menuApplicationId?: string // 所属应用ID
  menuName?: string // 菜单名称
  menuIcon?: string // 菜单图标
  treeParentId?: string // 父ID字段名
  treeName?: string // 名称字段名
}

export interface GenTableUpdateVO {
  id: string
  name?: string // 表名称
  comment?: string // 表注释
  swaggerComment?: string // swagger注释
  dsId?: string // 数据源
  author?: string // 作者
  subId?: string // 关联子表的ID
  subJavaFieldName?: number // 子表关联的外键Java字段名
  entityName?: string // 实体名称
  entitySuperClass?: string // 父类
  superClass?: string // 实体父类
  parent?: string // 父包名
  plusModuleName?: string // 前端模块名
  plusApplicationName?: string // 前端应用名
  serviceName?: string // 服务名
  moduleName?: string // 模块名
  childPackageName?: string // 子包名
  isTenantLine?: boolean // 行级租户注解
  dsValue?: string // 数据源
  isDs?: boolean // 数据源级租户注解
  isLombok?: boolean // lombok
  isChain?: boolean // 链式模型
  isColumnConstant?: boolean // 是否生成字段常量
  genType?: string // 生成代码方式
  outputDir?: string // 后端生成路径
  frontOutputDir?: string // 前端生成路径
  tplType?: string // 使用的模板
  popupType?: string // 弹窗方式
  addAuth?: string // 新增按钮权限编码
  editAuth?: string // 编辑按钮权限编码
  deleteAuth?: string // 删除按钮权限编码
  viewAuth?: string // 查看按钮权限编码
  copyAuth?: string // 复制按钮权限编码
  addShow?: boolean // 新增按钮是否显示
  editShow?: boolean // 编辑按钮是否显示
  deleteShow?: boolean // 删除按钮是否显示
  copyShow?: boolean // 复制按钮是否显示
  viewShow?: boolean // 详情按钮是否显示
  options?: string // 其它生成选项
  remarks?: string // 备注
  menuParentId?: string // 上级菜单ID
  menuApplicationId?: string // 所属应用ID
  menuName?: string // 菜单名称
  menuIcon?: string // 菜单图标
  treeParentId?: string // 父ID字段名
  treeName?: string // 名称字段名
}

export interface GenTableResultVO {
  echoMap?: any
  id?: string //
  createdBy?: string // 更新者
  createdTime?: string // 更新时间
  updatedBy?: string // 创建者
  updatedTime?: string // 创建时间
  name?: string // 表名称
  comment?: string // 表注释
  swaggerComment?: string // swagger注释
  dsId?: string // 数据源
  author?: string // 作者
  subId?: string // 关联子表的ID
  subJavaFieldName?: number // 子表关联的外键Java字段名
  entityName?: string // 实体名称
  entitySuperClass?: string // 父类
  superClass?: string // 实体父类
  parent?: string // 父包名
  plusModuleName?: string // 前端模块名
  plusApplicationName?: string // 前端应用名
  serviceName?: string // 服务名
  moduleName?: string // 模块名
  childPackageName?: string // 子包名
  isTenantLine?: boolean // 行级租户注解
  dsValue?: string // 数据源
  isDs?: boolean // 数据源级租户注解
  isLombok?: boolean // lombok
  isChain?: boolean // 链式模型
  isColumnConstant?: boolean // 是否生成字段常量
  genType?: string // 生成代码方式
  outputDir?: string // 后端生成路径
  frontOutputDir?: string // 前端生成路径
  tplType?: string // 使用的模板
  popupType?: string // 弹窗方式
  addAuth?: string // 新增按钮权限编码
  editAuth?: string // 编辑按钮权限编码
  deleteAuth?: string // 删除按钮权限编码
  viewAuth?: string // 查看按钮权限编码
  copyAuth?: string // 复制按钮权限编码
  addShow?: boolean // 新增按钮是否显示
  editShow?: boolean // 编辑按钮是否显示
  deleteShow?: boolean // 删除按钮是否显示
  copyShow?: boolean // 复制按钮是否显示
  viewShow?: boolean // 详情按钮是否显示
  options?: string // 其它生成选项
  remarks?: string // 备注
  menuParentId?: string // 上级菜单ID
  menuApplicationId?: string // 所属应用ID
  menuName?: string // 菜单名称
  menuIcon?: string // 菜单图标
  treeParentId?: string // 父ID字段名
  treeName?: string // 名称字段名
}
