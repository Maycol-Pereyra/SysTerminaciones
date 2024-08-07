--CREATE TRIGGER [TrgRegistraAuditoriaProducto]
--ON Producto
--AFTER INSERT, UPDATE
--AS
--BEGIN

--    -- Para operaciones de INSERT
--    INSERT INTO ProductAudit (ProductID, Operation, OperationDate, NewProductName, NewUnitPrice)
--    SELECT i.ProductID, 'INSERT', GETDATE(), i.ProductName, i.UnitPrice
--    FROM inserted i;






--    -- Para operaciones de UPDATE
--    INSERT INTO ProductAudit (ProductID, Operation, OperationDate, OldProductName, NewProductName, OldUnitPrice, NewUnitPrice)
--    SELECT d.ProductID, 'UPDATE', GETDATE(), d.ProductName, i.ProductName, d.UnitPrice, i.UnitPrice
--    FROM deleted d
--    INNER JOIN inserted i ON d.ProductID = i.ProductID;
--END;


-- TODO MAYCOL: Evaluar como se va a manejar la inserccion de los diferentes campos afectados
