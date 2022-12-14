import { Component } from '@angular/core';
import { Product } from '@eshop/product';
import { UserService } from '@eshop/user-auth';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as CountryData from 'i18n-iso-countries';

@Component({
  selector: 'eshop-admin-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: Product[] = [];
  isLoading: boolean = false;
  constructor(
    private service: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this._fetchData();
  }

  onDelete(itemId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-trash',
      accept: () => {
        this.service.deleteUser(itemId).subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete User',
              detail: 'User delete successfully',
            });
            this._fetchData();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: `(${err.status}) ${err.statusText}`,
              detail: "Can't delete user",
            });
          }
        );
      },
    });
  }

  findCountry(countryCode: string): string {
    CountryData.registerLocale(require('i18n-iso-countries/langs/en.json'));
    return CountryData.getName(countryCode, 'en', { select: 'official' });
  }

  private _fetchData() {
    this.isLoading = true;
    this.service.getUsers().subscribe((res: any) => {
      this.users = res.result;
      this.isLoading = false;
    });
  }
}
