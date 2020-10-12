import { list } from './insights.controller';
describe('Insigths Controller', () => {
  const mockedSendJson = jest.fn();
  const res = {
    json: (object) => mockedSendJson(object),
  };
  describe('list', () => {
    it('should return an empty array if no transactions are stored for the user', () => {
      const req = {
        params: {
          customerId: 'customerID5',
        },
      };
      list(req, res);
      expect(mockedSendJson).toBeCalledWith([]);
      mockedSendJson.mockClear();
    });
    it('should return an array of insights for stored customerID', () => {
      const req = {
        params: {
          customerId: 'customerID1',
        },
      };
      list(req, res);
      expect(mockedSendJson).toBeCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: expect.any(String),
            message: expect.any(String),
          }),
        ])
      );
    });
  });
});
