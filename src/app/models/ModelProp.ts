export class ModelProp {
  constructor(public field: string, public header: string) {}
}

export class HeaderModel {
  public modelProps: ModelProp[] = [];

  constructor() {
    this.modelProps = [
      new ModelProp('id', 'ID'),
      new ModelProp('amount', 'Amount'),
      new ModelProp('createdAt', 'Created At'),
      new ModelProp('currency', 'Currency'),
      new ModelProp('description', 'Description'),
      new ModelProp('status', 'Payment Status'),
      new ModelProp('', 'View Details'),
    ];
  }
}
