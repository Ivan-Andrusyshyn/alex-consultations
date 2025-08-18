export interface TestsUserData {
  _id?: string;
  testName:
    | 'you-coffee'
    | 'be-yourself'
    | 'attractiveness'
    | 'traumatic-experience'
    | 'role-in-relationships'
    | 'toxical-relationship';
  results?: string;
  timestamp?: string;
  device?: string;
  routeTracker?: string;
  referrer?: string;
  ip?: string;
  createdAt?: string;
  updatedAt?: string;
}
