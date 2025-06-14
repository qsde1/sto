import type { IRole } from './Role.model';
import type { CreateApplicationDTO, IApplication, IApplicationWithDependencies, UpdateApplicationDTO } from './Application.model';
import type { IStatus } from './Status.model';
import type { IPartsWork, IPartsWorkWithRelations, CreatePartsWorkDTO, UpdatePartsWorkDTO } from './PartsWork.model';
import type { IWork, IWorkWithDependencies, CreateWorkDTO, UpdateWorkDTO } from './Work.model';
import type { CreateBrandDTO, IBrand, UpdateBrandDTO } from './Brand.model';
import type { CreateModelDTO, IModel, UpdateModelDTO } from './Model.model';
import type { CreateClientCarDTO, IClientCar, UpdateClientCarDTO } from './ClientCar.model';
import type { IWorkTypePart, IWorkTypePartWithRelations, CreateWorkTypePartDTO, UpdateWorkTypePartDTO } from './WorkTypePart.model';
import type { ICar, CreateCarDTO, UpdateCarDTO } from './Car.model';
import type { IWorkType, CreateWorkTypeDTO, UpdateWorkTypeDTO } from './WorkType.model';
import type { IWorkCategory, CreateWorkCategoryDTO, UpdateWorkCategoryDTO } from './WorkCategory.model';
import type { IPart, CreatePartDTO, IPartWithSupplier } from './Part.model';
import type { ISupplier, CreateSupplierDTO } from './Supplier.model';
import type { CreateBoxDTO, IBox, UpdateBoxDTO } from './Box.model';
import type { IUser, IUserWithRole, CreateUserDTO, UpdateUserDTO } from './User.model';
import type { CreateClientDTO, IClient, UpdateClientDTO } from './Client.model';

export type {
    IRole,
    IApplication,
    IApplicationWithDependencies,
    CreateApplicationDTO,
    UpdateApplicationDTO,
    IStatus,
    IPartsWork,
    IPartsWorkWithRelations,
    CreatePartsWorkDTO,
    UpdatePartsWorkDTO,
    IWork,
    IWorkWithDependencies,
    CreateWorkDTO,
    UpdateWorkDTO,
    IBrand,
    CreateBrandDTO,
    UpdateBrandDTO,
    IModel,
    CreateModelDTO,
    UpdateModelDTO,
    IClientCar,
    CreateClientCarDTO,
    UpdateClientCarDTO,
    IWorkTypePart,
    IWorkTypePartWithRelations,
    CreateWorkTypePartDTO,
    UpdateWorkTypePartDTO,
    ICar,
    IWorkType,
    CreateWorkTypeDTO,
    UpdateWorkTypeDTO,
    IWorkCategory,
    CreateWorkCategoryDTO,
    UpdateWorkCategoryDTO,
    IPart,
    ISupplier,
    IBox,
    CreateBoxDTO,
    UpdateBoxDTO,
    IUser,
    IClient,
    CreateClientDTO,
    UpdateClientDTO,
    CreateCarDTO,
    UpdateCarDTO,
    IUserWithRole,
    CreateUserDTO,
    UpdateUserDTO,
    CreateSupplierDTO,
    CreatePartDTO,
    IPartWithSupplier,
};

export { ApplicationModel } from './Application.model';
export { BoxModel } from './Box.model';
export { BrandModel } from './Brand.model';
export { ModelModel } from './Model.model';
export { ClientCarModel } from './ClientCar.model';
export { CarModel } from './Car.model';
export { RoleModel } from './Role.model';
export { UserModel } from './User.model';
export { ClientModel } from './Client.model';
export { WorkCategoryModel } from './WorkCategory.model';
export { WorkTypeModel } from './WorkType.model';
export { WorkModel } from './Work.model';
export { SupplierModel } from './Supplier.model';
export { PartModel } from './Part.model';
export { WorkTypePartModel } from './WorkTypePart.model';
export { PartsWorkModel } from './PartsWork.model';